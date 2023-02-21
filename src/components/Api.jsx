import axios from "axios";

const fetchImages = async (searchImgName, page, controller) => {
    return axios(
      {
        url: 'https://pixabay.com/api/',
        params: {
          key: '31272833-6208e6f151d79070e75270c69',
          q: searchImgName,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          per_page: 12,
          page: page,
        },
      },
      { signal: controller.signal }
    ).then(response => {
      console.log(response.data.hits);
      return response.data.hits
    });
}
export default fetchImages;

// const fetchImages = async (searchImgName, page, controller) => {
//     return axios(
//       {
//         url: 'https://pixabay.com/api/',
//         params: {
//           key: '31272833-6208e6f151d79070e75270c69',
//           q: searchImgName,
//           image_type: 'photo',
//           orientation: 'horizontal',
//           safesearch: true,
//           per_page: 12,
//           page: page,
//         },
//       },
//       { signal: controller.signal }
//     ).then(response => response.data.hits);
// }
// export default fetchImages;