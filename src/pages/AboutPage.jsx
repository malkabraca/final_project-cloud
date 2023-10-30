import { Container } from "react-bootstrap";

const AboutPage = () => {
  return (
    <Container>
      <h1 className="title">AboutPage</h1>
      <h2 className="subtitle">
        Welcome to the Senyor restaurant, an Italian dairy chef restaurant!
      </h2>
      <p className="pAbuot">Login:</p>
      <p className="phome">
        You can register on the site for maximum use of the site service You can
        log in and register on the designated pages in the nav bar. The details
        will be saved in the data and the payload will be saved in
        local-storage. that will appear on the home page (if any), It is not
        possible to connect independently to the admin, but only the site
        administrator will be able to update it with the date. Are you done and
        don't want the account to remain open? By clicking on the logout, you do
        not exit the personal account.
      </p>
      <p className="pAbuot">Menu:</p>
      <p className="phome">
        The menu appears in 2 views for the user's convenience. There is also
        the option to sort by categories or search in the search field that
        appears in Navbar. A user who is not logged in will be able to view the
        menu but will not be able to order. A logged in user will be able to
        order only after filling out an order form, after filling out the form
        the user will be taken to a menu page where you can choose the desired
        amount per dish and order. By clicking on the end of the order, a pop-up
        will open if the summary of the order, the price to be paid and the
        option to proceed to payment, on the payment page it will be possible to
        insert a credit card. Only after the payment is confirmed will the order
        go to the kitchen for work. At any time you can access my order through
        the nav bar to view the order details and order status. An admin type
        user can through the nav bar enter the menu where he can edit and delete
        products as well as add new products by clicking on the + icon
      </p>
      <p className="pAbuot">Contact:</p>
      <p className="phome">
        On this page you can fill out a contact form. A connected user can also
        open a recommendation page and recommend us: The recommendations will be
        saved and displayed with the user's profile picture on the home page.
        Profile picture: by clicking on the profile picture, the profile page
        will open where the user can change his personal details by clicking OK,
        the new details will be saved and the picture will change in the nav bar
        and recommendations.
      </p>
      <p className="pAbuot">CRM:</p>
      <p className="phome">
        An admin user will also be able to enter the CRM page and access the
        user management interface displayed in the user table, which displays
        the number of users registered in the database on the site and displays
        their details in the table. On this page you can delete users or change
        their status from a regular admin user. In addition, there is an order
        management interface displayed in the order table, which shows the
        number of orders registered in the database and their details and the
        order status. On this page, you can access each order separately and
        change the order status. There is another table reservation management
        interface displayed in the table reservations table, which shows the
        number of table reservations available in the database.
      </p>
      <p className="pAbuot">footer:</p>
      <p className="phome">
        at the bottom of each page appears the footer with the restaurant's logo
        and contact information in an experiential and convenient way for the
        user. Clicking on the icons will open the following:
        <br></br>
        1. Clock - inscription if the restaurant is open or closed.
        <br></br>
        2. Location - Google resets if the website address.
        <br></br>
        3.Whatsapp -Switch to WhatsApp if you enter the restaurant's phone
        number.
        <br></br>
        4. Email- go to the gmail window if the recipient of the restaurant's
        email.
      </p>
      <p className="pAbuot"></p>
      <p className="phome">
        The site is responsive and fully adapted to use all types of media. A
        lot of time and effort was invested in creating an experiential and fun
        website. You are invited to try it out.
      </p>
    </Container>
  );
};
export default AboutPage;
