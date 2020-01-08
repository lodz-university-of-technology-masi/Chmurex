package TestFilling;

import Common.DynamoDBAdapter;
import Common.GatewayResponse;
import Model.PutAnswersInDBRequest;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapperConfig;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import java.util.HashMap;
import java.util.Map;

public class PutAnswersInDB implements RequestHandler<PutAnswersInDBRequest, GatewayResponse> {

    private String DYNAMODB_TABLE_NAME = "TestAnswers";
    private DynamoDBMapperConfig mapperConfig = DynamoDBMapperConfig.builder()
            .withTableNameOverride(new DynamoDBMapperConfig.TableNameOverride(DYNAMODB_TABLE_NAME))
            .build();
    private DynamoDBMapper mapper = DynamoDBAdapter.getInstance(mapperConfig).getMapper();

    public GatewayResponse handleRequest(PutAnswersInDBRequest request, Context context)
    {
        mapper.save(request);
        Map<String, String> headers = new HashMap<>();
        headers.put("Content-Type", "application/json");
        headers.put("X-Custom-Header", "application/json");
        String output = "Test Answer saved successfully";

        return new GatewayResponse(output, headers, 200);
    }
}
