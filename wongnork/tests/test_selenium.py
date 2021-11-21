from django.test import LiveServerTestCase
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

# Create your tests here.
class selenium_test(LiveServerTestCase):

    def setUp(self):
        """Set up for testing."""
        self.driver = webdriver.Chrome(r'C:\Users\MSI GF63\Desktop\isp-project\wongnork\chromedriver.exe')
        url = "http://127.0.0.1:8000/"
        self.driver.get(url)

    def test_login_link(self):
        """Test if the login page link to correct link."""
        url_list = []
        self.url = self.driver.find_elements_by_tag_name("a")
        for url in self.url:
           page_url = url.get_attribute('href')
           url_list.append(page_url)
        self.assertIn("http://127.0.0.1:8000/wongnork/login", url_list)
    
    def test_register_link(self):
        """Test if the register page link to correct link."""
        url_list = []
        self.url = self.driver.find_elements_by_tag_name("a")
        for url in self.url:
           page_url = url.get_attribute('href')
           url_list.append(page_url)
        self.assertIn("http://127.0.0.1:8000/wongnork/register", url_list)

    def test_home_page_link(self):
        """Test if the home page link to correct link."""
        url_list = []
        self.url = self.driver.find_elements_by_tag_name("a")
        for url in self.url:
           page_url = url.get_attribute('href')
           url_list.append(page_url)
        self.assertIn("http://127.0.0.1:8000/", url_list)
