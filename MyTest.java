import io.appium.java_client.remote.MobileCapabilityType;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.testng.annotations.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.remote.RemoteWebDriver;
import java.net.URL;

public class MyTest {

    @Test
    public void testApp() throws Exception {

        // Define desired capabilities
        DesiredCapabilities capabilities = new DesiredCapabilities();
        capabilities.setCapability(MobileCapabilityType.PLATFORM_NAME, "Android");
        capabilities.setCapability(MobileCapabilityType.PLATFORM_VERSION, "Android_version");
        capabilities.setCapability(MobileCapabilityType.DEVICE_NAME, "Device_Name");
        capabilities.setCapability("app", "exp://localhost:19000");

        // Initialize Appium driver
        WebDriver driver = new RemoteWebDriver(new URL("http://127.0.0.1:4723/wd/hub"), capabilities);

        // Your test steps go here
        // For example:
        // driver.findElement(By.id("your_element_id")).click();

        // Quit the driver
        driver.quit();
    }
}
