package CandidateAssignment;

import Common.DynamoDBAdapter;
import Common.GatewayResponse;
import Model.AssignmentTable;
import Model.GetAssignmentTableRequest;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapperConfig;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import java.util.HashMap;
import java.util.Map;

public class GetAssignmentTable implements RequestHandler<GetAssignmentTableRequest, GatewayResponse> {
    private String DYNAMODB_TABLE_NAME = "TestAssignments";
    private DynamoDBMapperConfig mapperConfig = DynamoDBMapperConfig.builder()
            .withTableNameOverride(new DynamoDBMapperConfig.TableNameOverride(DYNAMODB_TABLE_NAME))
            .build();
    private DynamoDBMapper mapper = DynamoDBAdapter.getInstance(mapperConfig).getMapper();

    @Override
    public GatewayResponse handleRequest(GetAssignmentTableRequest request, Context context) {
        String userEmail = request.getID();

        Map<String, String> headers = new HashMap<>();
        headers.put("Content-Type", "application/json");
        headers.put("X-Custom-Header", "application/json");
        AssignmentTable assignmentTable = mapper.load(AssignmentTable.class, userEmail);
        if(assignmentTable == null){
            AssignmentTable createdAT = new AssignmentTable();
            createdAT.setID(userEmail);
            createdAT.setJSON("{\"tests\":[]}");
            mapper.save(createdAT);
            return new GatewayResponse(createdAT.toString(), headers, 200);
        }

        return new GatewayResponse(assignmentTable.toString(), headers, 200);
    }
}
