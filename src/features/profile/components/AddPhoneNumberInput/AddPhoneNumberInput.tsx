import { Text } from "@chakra-ui/react";
import { useFormik } from "formik";
import { validationSchema } from "@/config/validation/phoneNumberValidationSchema";
import { useUpdateUserDataMutation } from "@/services/users";
import { UserObjectType } from "@/shared/types/UserType";
import { useState } from "react";
import styles from "./styles.module.scss";

export const AddPhoneNumberInput = ({ user }: { user: UserObjectType }) => {
  const [updateUserData] = useUpdateUserDataMutation();
  const handleSubmit = () => {
    updateUserData({
      userId: user.id,
      userData: { ...user, phoneNumber: formik.values.phoneNumber },
    });
    setIsPhoneNumberInputShown(false);
  };

  const [isPhoneNumberInputShown, setIsPhoneNumberInputShown] = useState(false);
  const btnLabel = user.phoneNumber ? "Edit phone number" : "Add phone number";

  const formik = useFormik({
    initialValues: { phoneNumber: user.phoneNumber },
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
  });
  return (
    <div className={styles.phone__number}>
      {!isPhoneNumberInputShown && user.phoneNumber}
      <form onSubmit={formik.handleSubmit}>
        <div>
          {isPhoneNumberInputShown && (
            <div className={styles.phone__number__container}>
              <input
                className={styles.phone__number__input}
                type="text"
                name="phoneNumber"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
              />
              <Text
                className={styles.phone__number__error}
                fontSize="3xl"
                color="red"
              >
                {formik.errors.phoneNumber}
              </Text>
              <button className={styles.phone__number__button} type="submit">
                {btnLabel}
              </button>
            </div>
          )}
        </div>
      </form>
      {!isPhoneNumberInputShown && (
        <button
          className={styles.phone__number__button}
          onClick={() => setIsPhoneNumberInputShown(!isPhoneNumberInputShown)}
        >
          {btnLabel}
        </button>
      )}
    </div>
  );
};
