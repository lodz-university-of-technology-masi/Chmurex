package TestTemplateLambdas.UpdateTestTemplateToDB;

import Common.DynamoDBAdapter;
import Common.GatewayResponse;
import Model.Test;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapperConfig;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import java.util.HashMap;
import java.util.Map;

public class UpdateTest implements RequestHandler<Test, GatewayResponse> {

    private String DYNAMODB_TABLE_NAME = "TestTemplates";
    private DynamoDBMapperConfig mapperConfig = DynamoDBMapperConfig.builder()
            .withTableNameOverride(new DynamoDBMapperConfig.TableNameOverride(DYNAMODB_TABLE_NAME))
            .build();
    private DynamoDBMapper mapper = DynamoDBAdapter.getInstance(mapperConfig).getMapper();

    public GatewayResponse handleRequest(Test request, Context context)
    {
        Test test = mapper.load(Test.class, request.getID());
        Map<String, String> headers = new HashMap<>();
        headers.put("Content-Type", "application/json");
        headers.put("X-Custom-Header", "application/json");

        if (test == null) {
            String output = "Test doesn't exist in database";
            return new GatewayResponse(output,headers,404);
        }
        mapper.save(request);

        String output = "Test Template updated successfully";

        return new GatewayResponse(output, headers, 200);
    }
}

