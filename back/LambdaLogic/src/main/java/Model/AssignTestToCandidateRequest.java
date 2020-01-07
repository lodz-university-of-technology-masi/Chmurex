package Model;


import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;

@DynamoDBTable(tableName = "TestAssignments")
public class AssignTestToCandidateRequest {
    private String testID;
    private String JSON;

    @DynamoDBHashKey(attributeName = "CandidateEmail")
    public String getEmail() {
        return testID;
    }

    public void setEmail(String testID) {
        this.testID = testID;
    }

    @DynamoDBAttribute(attributeName = "Tests")
    public String getJSON() {
        return JSON;
    }

    public void setJSON(String JSON) {
        this.JSON = JSON;
    }
}
