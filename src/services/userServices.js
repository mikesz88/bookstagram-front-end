class User {
  constructor() {
    this.id = '';
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.role = '';
    this.forgotPasswordQuestion = '';
    this.isLoggedIn = false;
  }

  setIsLoggedIn(loggedIn) {
    this.isLoggedIn = loggedIn;
  }

  setUserData(userData) {
    const { id, firstName, lastName, email, role, forgotPassword } = userData;

    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.role = role;
    this.forgotPasswordQuestion = forgotPassword.forgotPasswordQuestion;
  }
}

export default User;
