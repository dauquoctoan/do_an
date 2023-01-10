export const history = {
  push(pathName: string) {
    window.location.pathname = pathName;
  },
  back() {
    window.history.back();
  },
};
