import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);

mock.onGet("api/users").reply(200, {
    users: [{ id: 1, name: "John Smith" }],
});
mock.onPost('api/form').reply(config => {
    return new Promise(function(resolve) {
        setTimeout(function() {
            const data = JSON.parse(config.data);
            resolve([200, { message: 'OK', result: true, data: data }]);
        }, 1000);
    });
});
export const useMock = () => {
    const fetch = (data) => {
        return axios.post("api/form", {data})
    }
    return {fetch: fetch }
}
