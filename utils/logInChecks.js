const logInChecks = (user) => {
  if (!user.isVerified) {
    return "email-unverified";
  }
  if (user.role === "artist") {
    if (!user.isProfileCompleted) {
      return "artist-profile-setup-pending";
    }
    if (!user.isVerified) {
      return "artist-email-verification-pending";
    }
  } else if (user.role === "admin") {
    if (!user.isProfileCompleted) {
      return "Admin-profile-setup-pending";
    }
    if (!user.isVerified) {
      return "Admin-Email-verification-pending";
    }
  } else {
    return "Invalid userType";
  }
  return "login-granted";
};

module.exports = { logInChecks };
