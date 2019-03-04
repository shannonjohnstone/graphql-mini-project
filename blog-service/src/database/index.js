// Demo user data
const db = {
  users: [
    {
      id: '1',
      name: 'Dustin',
      email: 'dustin@example.com',
      comments: ['1', '4'],
    },
    {
      id: '2',
      name: 'Zag',
      email: 'dustin@example.com',
      age: 1,
      comments: ['2', '3'],
    },
  ],
  comments: [
    {
      id: '1',
      text: 'First comment',
      author: '1',
      post: '3',
    },
    {
      id: '2',
      text: 'Second comment',
      author: '2',
      post: '3',
    },
    {
      id: '3',
      text: 'Third comment',
      author: '2',
      post: '2',
    },
    {
      id: '4',
      text: 'Forth comment',
      author: '1',
      post: '1',
    },
  ],
  posts: [
    {
      id: '1',
      title: 'A dogs life',
      body: 'this is the dummy body text',
      published: true,
      author: '1',
      comments: ['4'],
    },
    {
      id: '2',
      title: 'The sun',
      body: 'this is the dummy body text',
      published: true,
      author: '1',
      comments: ['3'],
    },
    {
      id: '3',
      title: 'Why we dislike cats',
      body: 'this is the dummy body text',
      published: true,
      author: '2',
      comments: ['1', '2'],
    },
    {
      id: '4',
      title: 'Not Completed!',
      body: 'blah blah blah',
      published: false,
      author: '2',
    },
  ],
}

export default db
