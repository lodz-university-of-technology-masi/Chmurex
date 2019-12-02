package helloworld;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;
import org.junit.Test;

public class HelloAppTest {
  @Test
  public void successfulResponse() {
    HelloApp helloApp = new HelloApp();
    GatewayResponse result = (GatewayResponse) helloApp.handleRequest(null, null);
    assertEquals(result.getStatusCode(), 200);
    assertEquals(result.getHeaders().get("Content-Type"), "application/json");
    String content = result.getBody();
    assertNotNull(content);
    assertTrue(content.contains("\"message\""));
    assertTrue(content.contains("\"hello 2 world\""));
    assertTrue(content.contains("\"location\""));
  }
}
