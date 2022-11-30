// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <UseAuthWithRedirectTo {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import UseAuthWithRedirectTo from './UseAuthWithRedirectTo'

export const generated = () => {
  return <UseAuthWithRedirectTo />
}

export default {
  title: 'Components/UseAuthWithRedirectTo',
  component: UseAuthWithRedirectTo,
}
