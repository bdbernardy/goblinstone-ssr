import StatusCodesEnum from './StatusCodesEnum';

const redirects = [
  {
    from: '/blog/blog',
    to: '/blog',
    status: StatusCodesEnum.PermanentRedirect
  },
  {
    from: "/blog/:id",
    to: ({id}) => `/articles/${id}`,
    status: StatusCodesEnum.PermanentRedirect
  }
];

export default redirects;
