import { Text } from "@chakra-ui/react";
import { useFormik } from "formik";
import { validationSchema } from "@/config/validation/descriptionInputValidation";
import { useUpdateUserDataMutation } from "@/shared/services/users";
import { UserObjectType } from "@/shared/types/UserType";
import { useState } from "react";
import styles from "./styles.module.scss";

export const AddDescriptionInput = ({ user }: { user: UserObjectType }) => {
  const [updateUserData] = useUpdateUserDataMutation();
  const [isDescriptionInputShown, setIsDescriptionInputShown] = useState(false);
  const handleSubmit = () => {
    updateUserData({
      userId: user.id,
      userData: { ...user, description: formik.values.description },
    });
    setIsDescriptionInputShown(false);
  };

  const btnLabel = user.description ? "Edit description" : "Add description";

  const formik = useFormik({
    initialValues: { description: user.description },
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
  });
  return (
    <div className={styles.description}>
      {!isDescriptionInputShown && (
        <p className={styles.description__text}>{user.description}</p>
      )}
      <form onSubmit={formik.handleSubmit}>
        {isDescriptionInputShown && (
          <div>
            <div className={styles.description__container}>
              <textarea
                name="description"
                className={styles.description__input}
                value={formik.values.description}
                onChange={formik.handleChange}
              ></textarea>

              <Text
                className={styles.description__error}
                fontSize="3xl"
                color="red"
              >
                {formik.errors.description}
              </Text>
              <button className={styles.description__button} type="submit">
                {btnLabel}
              </button>
            </div>
          </div>
        )}
      </form>
      {!isDescriptionInputShown && (
        <button
          className={styles.description__button}
          onClick={() => setIsDescriptionInputShown(true)}
        >
          {btnLabel}
        </button>
      )}
    </div>
  );
};
