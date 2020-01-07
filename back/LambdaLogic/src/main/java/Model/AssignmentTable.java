package Model;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;

@DynamoDBTable(tableName = "TestAssignments")
public class AssignmentTable {
    private String ID;


    private String JSON;

    @DynamoDBHashKey(attributeName = "CandidateEmail")
    public String getID() {
        return ID;
    }

    public void setID(String ID) {
        this.ID = ID;
    }

    @DynamoDBAttribute(attributeName = "Tests")
    public String getJSON() {
        return JSON;
    }

    public void setJSON(String JSON) {
        this.JSON = JSON;
    }


    @Override
    public String toString() {
        return "Assignments{" +
                "Email='" + ID + '\'' +
                ", JSON='" + JSON + '\'' +
                '}';
    }
}