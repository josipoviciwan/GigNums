export const createGig = gig => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;

    firestore
      .collection("gigs")
      .add({
        ...gig,
        authorFirstName: profile.firstName,
        authorLastName: profile.lastName,
        authorId: authorId
      })
      .then(() => {
        dispatch({ type: "CREATE_GIG_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "CREATE_GIG_ERROR" }, err);
      });
  };
};

export const updateGig = (gig, id) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;

    firestore
      .collection("gigs")
      .doc(id)
      .set(
        {
          ...gig,
          authorFirstName: profile.firstName,
          authorLastName: profile.lastName,
          authorId: authorId
        },
        { merge: true }
      )

      .then(() => {
        dispatch({ type: "UPDATE_GIG_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "UPDATE_GIG_ERROR" }, err);
      });
  };
};

export const deleteGig = id => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection("gigs")
      .doc(id)
      .delete()
      .then(() => {
        dispatch({ type: "DELETE_GIG_SUCCESS" });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: "DELETE_GIG_ERROR" });
      });
  };
};
