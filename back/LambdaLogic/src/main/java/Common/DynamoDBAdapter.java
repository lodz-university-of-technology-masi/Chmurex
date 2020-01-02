package Common;

import com.amazonaws.regions.Regions;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapperConfig;
import com.amazonaws.services.dynamodbv2.document.DynamoDB;

public class DynamoDBAdapter {
    private static DynamoDBAdapter db_adapter;
    private static DynamoDB dynamoDB;
    private static DynamoDBMapper mapper;
    private static AmazonDynamoDB client;

    private DynamoDBAdapter() {
        this.client = AmazonDynamoDBClientBuilder.standard()
                .withRegion(Regions.US_EAST_1)
                .build();
    }

    public static DynamoDBAdapter getInstance(DynamoDBMapperConfig config) {
        if (db_adapter == null)
        {
            db_adapter = new DynamoDBAdapter();
            dynamoDB = new DynamoDB(client);
            mapper = new DynamoDBMapper(client,config);
        }
        return db_adapter;

    }

    public DynamoDB getDynamoDB() {
        return dynamoDB;
    }

    public DynamoDBMapper getMapper() {
        return mapper;
    }
}