export default {
  name: "mail-Details",
  // props: ["emails"],
  template: `
<h1>mail-Details</h1>
`,
  created() {
    const { emailId } = this.$route.params;
    // console.log(emailId);
    // bookService.getById(bookId)
    //     .then(book => this.book = book)
  },
  components: {
    // mailPreview,
  },
};
