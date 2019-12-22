//package NewTestTemplate;
//
//import org.junit.Test;
//
//import static org.junit.Assert.*;
//
//public class NewTestTemplateManagerTest {
//    @Test
//    public void successfulResponse(){
//        NewTestTemplateManager newTestTemplateManager = new NewTestTemplateManager();
//        Common.GatewayResponse result = (Common.GatewayResponse) newTestTemplateManager.handleRequest(null, null);
//        assertEquals(result.getStatusCode(), 200);
//        String content = result.getBody();
//        assertNotNull(content);
//        assertTrue(content.contains("Test Template saved successfully"));
//    }
//}
