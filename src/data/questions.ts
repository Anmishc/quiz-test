export const questionsData = [
  {
    id: 1,
    title: 'What is your preferred language?',
    subTitle: 'Choose language',
    type: 'single-select',
    options: [{ id: 1, text: 'English' }, { id: 2, text: 'French' }, { id: 3, text: 'German' }, { id: 4, text: 'Spanish' }],
  },
  {
    id: 2,
    title: 'What gender do you identify with?',
    subTitle: 'Please share how do you identify yourself',
    type: 'single-select-image',
    options: [
      { id: 1, img: '👩', text: 'Female' },
      { id: 2, img: '👨', text: 'Male' },
      { id: 3, img: '😉', text: 'Other' },
    ],
  },
  {
    id: 3,
    title: 'What is your age?',
    type: 'single-select',
    options: [{ id: 1, text: '18-29 years' }, { id: 2, text: '30-39 years' }, { id: 3, text: '40-49 years' }, { id: 4, text: '50+' }],
  },
  {
    id: 4,
    title: 'What do you hate the most in a book?',
    type: 'multiple-select',
    options: [
      { id: 1, text: 'Lack of logic' },
      { id: 2, text: 'A slow speed' },
      { id: 3, text: 'Lack of humor' },
      { id: 4, text: 'Way too generic ending' },
    ],
  },
  {
    id: 5,
    title: 'What are your favorite topics?',
    subTitle: 'Choose up to 3 topics you like',
    type: 'bubble',
    options: [
      { id: 1, img: '🐺', text: 'Werewolf' },
      { id: 2, img: '⚡', text: 'Action' },
      { id: 3, img: '👑', text: 'Royal Obsession' },
      { id: 4, img: '💖', text: 'Romance' },
      { id: 5, img: '📚', text: 'Young Adult' },
      { id: 6, img: '😎', text: 'Bad Boy' },
      { id: 7, img: '💰', text: 'Billionaire' },
    ],
  },
];
