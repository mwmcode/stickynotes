function getRandomNum(min=0, max=900) {
  return Math.floor(Math.random() * (max - min) + min);
}



export function createNote() {
  const datetimestamp = Date.now();

  return {
    id: datetimestamp,
    body: '',
    style: {
      position: 'fixed',
      top: `${getRandomNum(10, 300)}px`,
      left: `${getRandomNum(10, 1000)}px`,
    },
    createdAt: new Date(datetimestamp).toLocaleString(),
  };
}
