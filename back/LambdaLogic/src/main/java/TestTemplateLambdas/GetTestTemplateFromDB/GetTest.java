package TestTemplateLambdas.GetTestTemplateFromDB;

import Common.DynamoDBAdapter;
import Common.GatewayResponse;
import Model.Test;
import Model.TestRequest;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapperConfig;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class GetTest implements RequestHandler<TestRequest, GatewayResponse> {
    private String DYNAMODB_TABLE_NAME = "TestTemplates";
    private DynamoDBMapperConfig mapperConfig = DynamoDBMapperConfig.builder()
            .withTableNameOverride(new DynamoDBMapperConfig.TableNameOverride(DYNAMODB_TABLE_NAME))
            .build();
    private DynamoDBMapper mapper = DynamoDBAdapter.getInstance(mapperConfig).getMapper();

    public GatewayResponse handleRequest(TestRequest request, Context context) {
        Map<String, String> headers = new HashMap<>();
        headers.put("Content-Type", "application/json");
        headers.put("X-Custom-Header", "application/json");
        Test test = mapper.load(Test.class, request.getID());
        if (test == null) {
            String output = "Failed";
            return new GatewayResponse(output,headers,404);
        }
        JSONObject jsonObject = new JSONObject();
        jsonObject.append("test", test.getJSON());
        return new GatewayResponse(jsonObject.toString(),headers,200);
    }
}
