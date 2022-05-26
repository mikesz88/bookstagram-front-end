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
    const { _id, firstName, lastName, email, role, forgotPasswordQuestion } =
      userData;

    this.id = _id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.role = role;
    this.forgotPasswordQuestion = forgotPasswordQuestion;
  }
}

export default User;
