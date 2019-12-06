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

public class AddTest implements RequestHandler<AddTestRequest, AddTestResponse> {

    private DynamoDB dynamoDb;
    private String DYNAMODB_TABLE_NAME = "TestTemplates";
    private Regions REGION = Regions.US_EAST_1;

    public AddTestResponse handleRequest(AddTestRequest request,Context context)
    {
        this.initDynamoDbClient();
        persistData(request);

        AddTestResponse response = new AddTestResponse();
        response.setMessage("AUUUUUUUUUUUUUUUUUU");
        return response;
    }

    private PutItemOutcome persistData(AddTestRequest request) throws ConditionalCheckFailedException
    {
        return this.dynamoDb.getTable(DYNAMODB_TABLE_NAME)
                .putItem(
                new PutItemSpec().withItem(new Item()
                        .withPrimaryKey("TestId", "TestoweIDNaStale")
                        .withString("COOOOO","ELOOOOOOOOO")
 //                       .withList("Questions",request.getQuestions())
                )
                );
    }
    private void initDynamoDbClient(){
        AmazonDynamoDBClient client = new AmazonDynamoDBClient();
        client.setRegion(Region.getRegion(REGION));
        this.dynamoDb = new DynamoDB(client);
    }
}
