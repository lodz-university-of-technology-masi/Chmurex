package TestTemplateLambdas.AddTestTemplateToDB;

import Common.DynamoDBAdapter;
import Common.GatewayResponse;
import Model.Test;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapperConfig;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import java.util.HashMap;
import java.util.Map;

public class AddTest implements RequestHandler<Test, GatewayResponse> {

    private String DYNAMODB_TABLE_NAME = "TestTemplates";
    private DynamoDBMapperConfig mapperConfig = DynamoDBMapperConfig.builder()
            .withTableNameOverride(new DynamoDBMapperConfig.TableNameOverride(DYNAMODB_TABLE_NAME))
            .build();
    private DynamoDBMapper mapper = DynamoDBAdapter.getInstance(mapperConfig).getMapper();

    public GatewayResponse handleRequest(Test request, Context context)
    {
        Map<String, String> headers = new HashMap<>();
        headers.put("Content-Type", "application/json");
        headers.put("X-Custom-Header", "application/json");
        if (mapper.load(Test.class, request.getID()) != null) {
            String output = "Failed";
            return new GatewayResponse(output, headers, 400);
        }
        mapper.save(request);
        String output = "Test Template saved successfully";
        return new GatewayResponse(output, headers, 200);
    }
}
