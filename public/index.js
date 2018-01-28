/* global Vue, VueRouter, axios */
Vue.component("star-rating", VueStarRating.default);

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      message: "Welcome to CanIWorkHere.com!",
      posts: [],
      leftPosts: [],
      rightPosts: [],
      companyImages: {
        Actualize:
          "https://course_report_production.s3.amazonaws.com/rich/rich_files/rich_files/2186/s300/course-report-profile-photo-800px-by-800px.jpg",
        Uber:
          "http://www.oaklandpost.org/wp-content/uploads/2017/10/636247599789125010-1013090754_Uber-pic.jpg",
        Lyft:
          "https://commonwealthmagazine.org/wp-content/uploads/2016/12/lyft.jpg",
        IBM:
          "https://zdnet4.cbsistatic.com/hub/i/r/2017/04/25/63e1fffa-04e9-47ce-ac2a-bebfe0cd4c09/resize/770xauto/f797a7a91df9767962db9e0489abc734/ibm-abyss.png"
      }
    };
  },
  created: function() {
    // console.log(this.$root.search_results);
    axios.get("/v1/posts").then(
      function(response) {
        this.posts = response.data;
        var indexToSplit = this.posts.length / 2;
        this.leftPosts = this.posts.slice(0, indexToSplit);
        this.rightPosts = this.posts.slice(indexToSplit + 1);
      }.bind(this)
    );
  },
  methods: {
    getCompanyImage: function(company) {
      var image = this.companyImages[company.name];
      if (!image) {
        image =
          "https://www.asean-agrifood.org/wp-content/themes/fearless/images/missing-image-640x360.png";
      }
      return image;
    }
  },
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
    var url = "/v1/posts";
    if (this.$route.query.post_search) {
      url += "?post_search=" + this.$route.query.post_search;
    }
    axios.get(url).then(
      function(response) {
        this.posts = response.data;
      }.bind(this)
    );
  },

  //   axios.get("/v1/posts").then(
  //     function(response) {
  //       this.posts = response.data;
  //     }.bind(this)
  //   );
  // },
  methods: {},
  computed: {}
};

var ShowPost = {
  template: "#posts-show-page",
  data: function() {
    return {
      post: {
        comments: []
      },
      body: "",
      errors: [],
      error: [],
      users: {}
    };
  },
  created: function() {
    axios.get("/v1/posts/" + this.$route.params.id).then(
      function(response) {
        this.post = response.data;
      }.bind(this)
    );
  },
  methods: {
    submit: function() {
      var params = {
        body: this.body,
        post_id: this.$route.params.id
      };
      axios.post("/v1/comments", params).then(
        function(response) {
          this.post.comments.unshift(response.data);
          this.body = "";
        }.bind(this)
      );
    },
    linkify: function(inputText) {
      var replacedText, replacePattern1, replacePattern2, replacePattern3;

      //URLs starting with http://, https://, or ftp://
      replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
      replacedText = inputText.replace(
        replacePattern1,
        '<a href="$1" target="_blank">$1</a>'
      );

      //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
      replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
      replacedText = replacedText.replace(
        replacePattern2,
        '$1<a href="http://$2" target="_blank">$2</a>'
      );

      //Change email addresses to mailto:: links.
      replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
      replacedText = replacedText.replace(
        replacePattern3,
        '<a href="mailto:$1">$1</a>'
      );

      return replacedText;
    }
  },
  computed: {}
};

var CompanyIndexPage = {
  template: "#company-index-page",
  data: function() {
    return {
      message: "Main Company List",
      companies: [],
      glassdoorData: {
        response: { employers: [{}] },
        employers: {}
      }
    };
  },
  created: function() {
    var url = "/v1/companies";
    if (this.$route.query.company_search) {
      url += "?company_search=" + this.$route.query.company_search;
    }
    axios.get(url).then(
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
      },
      glassdoorData: {
        response: { employers: [{}] },
        employers: {}
      },
      rating: 3.1
    };
  },

  created: function() {
    axios.get("/v1/companies/" + this.$route.params.id).then(
      function(response) {
        this.company = response.data;

        axios.get("/v1/companies/glassdoor?company=" + this.company.name).then(
          function(response) {
            this.glassdoorData = response.data;
            console.log("glassdoorData is", this.glassdoorData);
          }.bind(this)
        );
      }.bind(this)
    );
  },
  methods: {
    setRating: function(rating) {
      this.rating = rating;
    }
  },
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

var UserPostIndexPage = {
  template: "#user-posts-index-page",
  data: function() {
    return {
      message: "Your Posts!",
      posts: []
    };
  },
  created: function() {
    axios.get("/v1/posts?current_user_posts=true").then(
      function(response) {
        this.posts = response.data;
        console.log(this.posts);
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
    { path: "/crime_categories/:id", component: ShowCrimeCat },
    { path: "/user-posts", component: UserPostIndexPage }
  ],

  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#vue-app",
  router: router,
  data: function() {
    return {
      companies: [],
      crime_categories: [],
      search_results: [],
      post_search_terms: [],
      company_search_terms: []
    };
  },
  created: function() {
    var jwt = localStorage.getItem("jwt");
    if (jwt) {
      axios.defaults.headers.common["Authorization"] = jwt;
    }
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
  methods: {
    runSearch: function() {
      console.log("runSearch");
      router.push("/posts?post_search=" + this.post_search_terms);
    },
    runCompanySearch: function() {
      console.log("runCompanyearch");
      router.push("/companies?company_search=" + this.company_search_terms);
    }
  },
  watch: {
    $route: function() {
      console.log("change route?");
      location.reload();
    }
  }
});
