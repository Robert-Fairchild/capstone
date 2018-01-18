/* global Vue, VueRouter, axios */

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      message: "Welcome to CanIWorkHere.com!",
      posts: [],
      companies: [],
      crime_categories: []
    };
  },
  created: function() {
    axios.get("/v1/posts").then(
      function(response) {
        this.posts = response.data;
      }.bind(this)
    );
    axios.get("/v1/companies").then(
      function(response) {
        this.companies = response.data;
        console.log(this.companies);
      }.bind(this)
    );
    axios.get("/v1/crime_categories").then(
      function(response) {
        this.crime_categories = response.data;
        console.log(this.crime_categories);
      }.bind(this)
    );
  },
  methods: {},
  computed: {}
};

var SignupPage = {
  template: "#signup-page",
  data: function() {
    return {
      user_name: "",
      first_name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        user_name: this.user_name,
        first_name: this.first_name,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation
      };
      axios
        .post("/v1/users", params)
        .then(function(response) {
          router.push("/login");
        })
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    }
  }
};

var LoginPage = {
  template: "#login-page",
  data: function() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        auth: { email: this.email, password: this.password }
      };
      axios
        .post("/user_token", params)
        .then(function(response) {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          router.push("/");
        })
        .catch(
          function(error) {
            this.errors = ["Invalid email or password."];
            this.email = "";
            this.password = "";
          }.bind(this)
        );
    }
  }
};
var LogoutPage = {
  created: function() {
    axios.defaults.headers.common["Authorization"] = undefined;
    localStorage.removeItem("jwt");
    router.push("/");
  }
};

var NewPostPage = {
  template: "#new-post-page",
  data: function() {
    return {
      title: "",
      company: [],
      crime_categories: [],
      body: "",
      errors: [],
      companies: [],
      crimeCategories: [],
      companyId: "",
      crimeCatId: ""
    };
  },
  created: function() {
    axios.get("/v1/crime_categories").then(
      function(response) {
        this.crime_categories = response.data;
        console.log(this.crime_categories);
      }.bind(this)
    );

    axios.get("/v1/companies").then(
      function(response) {
        this.companies = response.data;
        console.log(this.companies);
      }.bind(this)
    );

    axios.get("/v1/posts").then(
      function(response) {
        this.posts = response.data;
        console.log(this.posts);
      }.bind(this)
    );
  },
  methods: {
    submit: function() {
      var params = {
        title: this.title,
        company_id: this.companyId,
        crime_category_id: this.crimeCatId,
        body: this.body
        // user_id: this.user_id
      };
      axios
        .post("/v1/posts", params)
        .then(function(response) {
          router.push("/");
        })
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
            router.push("/login");
          }.bind(this)
        );
    }
  }
};

var PostsIndexPage = {
  template: "#posts-index-page",
  data: function() {
    return {
      message: "Everyones posts!",
      posts: []
    };
  },
  created: function() {
    axios.get("/v1/posts").then(
      function(response) {
        this.posts = response.data;
      }.bind(this)
    );
  },
  methods: {},
  computed: {}
};

var ShowPost = {
  template: "#posts-show-page",
  data: function() {
    return {
      post: {}
    };
  },
  created: function() {
    axios.get("/v1/posts/" + this.$route.params.id).then(
      function(response) {
        this.post = response.data;
      }.bind(this)
    );
  },
  methods: {},
  computed: {}
};

var CompanyIndexPage = {
  template: "#company-index-page",
  data: function() {
    return {
      message: "Main Company List",
      companies: []
    };
  },
  created: function() {
    axios.get("/v1/companies").then(
      function(response) {
        this.companies = response.data;
      }.bind(this)
    );
  },
  methods: {},
  computed: {}
};

var ShowCompany = {
  template: "#company-show-page",
  data: function() {
    return {
      company: {},
      companies: {
        posts: []
      }
    };
  },

  created: function() {
    axios.get("/v1/companies/" + this.$route.params.id).then(
      function(response) {
        this.company = response.data;
      }.bind(this)
    );
  },
  methods: {},
  computed: {}
};

var CrimeCategoryIndexPage = {
  template: "#crime-category-index-page",
  data: function() {
    return {
      message: "Crime Category List",
      crime_categories: []
    };
  },
  created: function() {
    axios.get("/v1/crime_categories").then(
      function(response) {
        this.crime_categories = response.data;
      }.bind(this)
    );
  },
  methods: {},
  computed: {}
};

var ShowCrimeCat = {
  template: "#crime-cat-show-page",
  data: function() {
    return {
      crime_category: {},
      crime_categories: {
        posts: []
      }
    };
  },
  created: function() {
    axios.get("/v1/crime_categories/" + this.$route.params.id).then(
      function(response) {
        this.crime_category = response.data;
      }.bind(this)
    );
  },
  methods: {},
  computed: {}
};

var router = new VueRouter({
  routes: [
    { path: "/", component: HomePage },
    { path: "/signup", component: SignupPage },
    { path: "/login", component: LoginPage },
    { path: "/logout", component: LogoutPage },
    { path: "/posts/create", component: NewPostPage },
    { path: "/posts/:id", component: ShowPost },
    { path: "/posts", component: PostsIndexPage },
    { path: "/companies/:id", component: ShowCompany },
    { path: "/companies", component: CompanyIndexPage },
    { path: "/crime_categories", component: CrimeCategoryIndexPage },
    { path: "/crime_categories/:id", component: ShowCrimeCat }
  ],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#vue-app",
  router: router,
  created: function() {
    var jwt = localStorage.getItem("jwt");
    if (jwt) {
      axios.defaults.headers.common["Authorization"] = jwt;
    }
  }
});
