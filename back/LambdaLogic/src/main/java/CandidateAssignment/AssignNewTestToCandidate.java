package CandidateAssignment;

import Common.DynamoDBAdapter;
import Common.GatewayResponse;
import Model.AssignTestToCandidateRequest;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapperConfig;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import java.util.*;

public class AssignNewTestToCandidate implements RequestHandler<AssignTestToCandidateRequest, GatewayResponse> {
    private String DYNAMODB_TABLE_NAME = "TestAssignments";
    private DynamoDBMapperConfig mapperConfig = DynamoDBMapperConfig.builder()
            .withTableNameOverride(new DynamoDBMapperConfig.TableNameOverride(DYNAMODB_TABLE_NAME))
            .build();
    private DynamoDBMapper mapper = DynamoDBAdapter.getInstance(mapperConfig).getMapper();

    @Override
    public GatewayResponse handleRequest(AssignTestToCandidateRequest request, Context context) {
        mapper.save(request);
        Map<String, String> headers = new HashMap<>();
        headers.put("Content-Type", "application/json");
        headers.put("X-Custom-Header", "application/json");
        return new GatewayResponse("Test assigned successfully", headers, 200);
    }
}