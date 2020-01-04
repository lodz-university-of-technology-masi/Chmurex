package TestTemplateLambdas.GetAllTestTemplatesFromDB;

import Common.DynamoDBAdapter;
import Common.GatewayResponse;
import Model.Test;
import Model.TestRequest;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapperConfig;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import org.json.JSONArray;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class GetAllTests implements RequestHandler<List<TestRequest>, GatewayResponse> {
    private String DYNAMODB_TABLE_NAME = "TestTemplates";
    private DynamoDBMapperConfig mapperConfig = DynamoDBMapperConfig.builder()
            .withTableNameOverride(new DynamoDBMapperConfig.TableNameOverride(DYNAMODB_TABLE_NAME))
            .build();
    private DynamoDBMapper mapper = DynamoDBAdapter.getInstance(mapperConfig).getMapper();

    @Override
    public GatewayResponse handleRequest(List<TestRequest> testRequests, Context context) {
        List<Test> tests = mapper.scan(Test.class, new DynamoDBScanExpression());
        JSONArray json = new JSONArray(tests);
        Map<String, String> headers = new HashMap<>();
        headers.put("Content-Type", "application/json");
        headers.put("X-Custom-Header", "application/json");
        return new GatewayResponse(json.toString(), headers, 200);
    }
}
