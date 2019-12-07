package AddTestTemplateToDB;

import com.amazonaws.regions.Region;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClient;
import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import com.amazonaws.services.dynamodbv2.document.Item;
import com.amazonaws.services.dynamodbv2.document.PutItemOutcome;
import com.amazonaws.services.dynamodbv2.document.spec.PutItemSpec;
import com.amazonaws.services.dynamodbv2.model.ConditionalCheckFailedException;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import java.util.HashMap;
import java.util.Map;

public class AddTest implements RequestHandler<AddTestRequest, GatewayResponse> {

    private DynamoDB dynamoDb;
    private String DYNAMODB_TABLE_NAME = "TestTemplates";
    private Regions REGION = Regions.US_EAST_1;

    public GatewayResponse handleRequest(AddTestRequest request,Context context)
    {
        this.initDynamoDbClient();
        persistData(request);

        Map<String, String> headers = new HashMap<>();
        headers.put("Content-Type", "application/json");
        headers.put("X-Custom-Header", "application/json");
        String output = "Test Template saved successfully";

        return new GatewayResponse(output, headers, 200);
    }

    private PutItemOutcome persistData(AddTestRequest request) throws ConditionalCheckFailedException
    {
        return this.dynamoDb.getTable(DYNAMODB_TABLE_NAME)
                .putItem(
                new PutItemSpec().withItem(new Item()
                        .withPrimaryKey("TestId", request.getID())
                        .withString("Test",request.getJSON())
                )
                );
    }
    private void initDynamoDbClient(){
        AmazonDynamoDBClient client = new AmazonDynamoDBClient();
        client.setRegion(Region.getRegion(REGION));
        this.dynamoDb = new DynamoDB(client);
    }
}
