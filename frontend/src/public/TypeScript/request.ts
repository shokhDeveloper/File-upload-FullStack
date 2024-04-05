const BECKEND_SERVER = "http://192.168.1.108:4000";
const BASE_METHODS: string[] = ["GET", "DELETE"];
const request = async (
  path: string,
  method: string,
  token?: string | null,
  body?: object,
  fileType?: boolean
): Promise<any> => {
  let headers = {};
  if (fileType) {
    headers = {
      token: token || "",
    };
  } else {
    headers = {
      "Content-type": "application/json",
      token: token || "",
    };
  }

  const options: RequestInit = {
    headers,
    method,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  if (fileType) {
    options.headers = {
      token: token || "",
    };

    return fetch(BECKEND_SERVER + path, options).then((res) => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      return res.blob();
    }).catch(error => console.error('Fetch error:', error));
  } else {
    return fetch(BECKEND_SERVER + path, options)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .catch((error) => console.error('Fetch error:', error));
  }
};

