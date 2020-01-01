package CandidateLambdas;


import Common.GatewayResponse;
import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProvider;
import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProviderClientBuilder;
import com.amazonaws.services.cognitoidp.model.*;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class GetAllCandidates implements RequestHandler<Object, GatewayResponse> {
    private AWSCognitoIdentityProvider cognito = AWSCognitoIdentityProviderClientBuilder.defaultClient();

    public GatewayResponse handleRequest(Object o, Context context) {
        ListUsersResult users = cognito.listUsers(new ListUsersRequest().withUserPoolId("us-east-1_Cb75QZCzu"));
        Map<String, Map<String, String>> map = new HashMap<>();
        List<UserType> candidates = users.getUsers();
        int i = 0;
        for (UserType user : candidates
        ) {
            Map<String, String> attributes = UserTypeConvert(user);
            if (attributes.get("custom:isRecruiter").equals("0")) {
                map.put(Integer.toString(i), attributes);
                i++;
            }
        }
        JSONObject json = new JSONObject(map);
        Map<String, String> headers = new HashMap<>();
        headers.put("Content-Type", "application/json");
        headers.put("X-Custom-Header", "application/json");
        return new GatewayResponse(json.toString(), headers, 200);
    }

    private Map<String, String> UserTypeConvert(UserType userType) {
        Map<String, String> map = new HashMap<>();
        for (AttributeType attribute : userType.getAttributes()) {
            map.put(attribute.getName(), attribute.getValue());
        }
        return map;
    }
}
