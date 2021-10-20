var app = new Vue({
    el: "#app",
    data() {
        return {
            email: "",
            password: "",
            response: "",
            errors: [],
            placeholderEmail: "sofia.soto@email.com",
            placeholderPass: "**********"
        }
    },
    methods: {
        validate(email, password) {
            const errors = [];
            if (!email) {
                errors.push({ message: "Input your email" });
            }

            if (!password) {
                errors.push({ message: "Input your password" });
            }

            return errors;
        },
        async login() {
            const { email, password } = this;
            const errors = this.validate(email, password);
            if (errors.length) {
                this.errors = errors;
                return;
            }

            try {
                const body = { user: { email, password } }
                const response = await axios.post("/api/login", body);

                if (response.status != 200) {
                    this.errors = response.data.errors;
                } else {
                    location.assign("/app");
                }

            } catch (error) {
                this.errors.push({ message: "Error login you in" });
            }
        }
    }
});