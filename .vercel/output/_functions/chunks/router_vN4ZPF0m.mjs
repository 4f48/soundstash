let navigateOnServerWarned = false;
async function navigate(href, options) {
  {
    if (!navigateOnServerWarned) {
      const warning = new Error(
        "The view transitions client API was called during a server side render. This may be unintentional as the navigate() function is expected to be called in response to user interactions. Please make sure that your usage is correct."
      );
      warning.name = "Warning";
      console.warn(warning);
      navigateOnServerWarned = true;
    }
    return;
  }
}

export { navigate as n };
