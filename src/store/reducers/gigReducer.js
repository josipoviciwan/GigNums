const initState = {};

const gigReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_GIG_SUCCESS":
      console.log("create gig success");
      return state;
    case "CREATE_GIG_ERROR":
      console.log("create gig error");
      return state;
    case "UPDATE_GIG_SUCCESS":
      console.log("update gig success");
      return state;
    case "UPDATE_GIG_ERROR":
      console.log("update gig error");
      return state;
    case "DELETE_GIG_SUCCESS":
      console.log("delete gig success");
      // window.location.reload();
      return state;
    case "DELETE_GIG_ERROR":
      console.log("delete gig error");
      return state;
    default:
      return state;
  }
};

export default gigReducer;
