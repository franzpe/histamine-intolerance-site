import React, { useState } from 'react';

import PersonalInformationForm from './PersonalInformationForm';
import ChangePasswordForm from './ChangePasswordForm';

function PersonalInformation() {
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);

  return !showChangePasswordForm ? (
    <PersonalInformationForm toggleChangePasswordForm={toggleChangePasswordForm} />
  ) : (
    <ChangePasswordForm toggleChangePasswordForm={toggleChangePasswordForm} />
  );

  function toggleChangePasswordForm(e) {
    setShowChangePasswordForm(!showChangePasswordForm);
  }
}

export default PersonalInformation;
