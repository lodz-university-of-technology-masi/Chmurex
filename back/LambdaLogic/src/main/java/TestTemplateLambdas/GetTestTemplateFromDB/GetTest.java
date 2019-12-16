package TestTemplateLambdas.GetTestTemplateFromDB;

import Model.Test;
import com.amazonaws.regions.Region;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClient;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBQueryExpression;
import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import com.amazonaws.services.dynamodbv2.document.QueryOutcome;
import com.amazonaws.services.dynamodbv2.document.Table;
import com.amazonaws.services.dynamodbv2.document.spec.QuerySpec;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.dynamodbv2.model.ConditionalCheckFailedException;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.dynamodbv2.document.Item;
import com.amazonaws.services.dynamodbv2.document.ItemCollection;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

public class GetTest implements RequestHandler<GetTestRequest, GatewayResponse> {

    private DynamoDBMapper mapper;
    private DynamoDB dynamoDb;
    private String DYNAMODB_TABLE_NAME = "TestTemplates";
    private Regions REGION = Regions.US_EAST_1;

    public GatewayResponse handleRequest(GetTestRequest request, Context context)
    {
        this.initDynamoDbClient();
        Test test = this.getData(request);
        Map<String, String> headers = new HashMap<>();
        headers.put("Content-Type", "application/json");
        headers.put("X-Custom-Header", "application/json");
        String output = "Test Template retrieved successfully";

        return new GatewayResponse(output, headers, 200);
    }

    private Test getData(GetTestRequest request) throws ConditionalCheckFailedException
    {
        String id = request.getID();
        Table table = dynamoDb.getTable(DYNAMODB_TABLE_NAME);

        HashMap<String, String> nameMap = new HashMap<String, String>();
        nameMap.put("#id", "TestId");

        HashMap<String, Object> av = new HashMap<String, Object>();
        av.put(":v1", id);

        QuerySpec querySpec = new QuerySpec()
                .withKeyConditionExpression("#id = :v1")
                .withNameMap(nameMap)
                .withValueMap(av);

        ItemCollection<QueryOutcome> items = null;
        Iterator<Item> iterator = null;
        Item item = null;
        try {
            items = table.query(querySpec);

            iterator = items.iterator();
            while (iterator.hasNext()) {
                item = iterator.next();
            }

        }
        catch (Exception e) {
            System.err.println("Unable to query");
            System.err.println(e.getMessage());
        }
        Test returnedTest = new Test();
        returnedTest.setID(item.getString("TestId"));
        returnedTest.setJSON(item.getString("Test"));
        return returnedTest;
    }

    private void initDynamoDbClient(){
        AmazonDynamoDBClient client = new AmazonDynamoDBClient();
        client.setRegion(Region.getRegion(REGION));
        this.dynamoDb = new DynamoDB(client);
    }
}
