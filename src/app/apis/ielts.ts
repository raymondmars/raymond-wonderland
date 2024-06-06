
interface scoringProps {
  essayType: number
  topic: string
  contents: string
  task1Image?: string
  onData: (data: string) => void
  onEnd?: () => void
}

export const scoreWritingWithStream = (payload: scoringProps) => {
  fetch('/api/ielts/score', {
    method: 'POST',
    body: JSON.stringify({essayType: payload.essayType, topic: payload.topic, contents: payload.contents, task1Image: payload.task1Image}),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    const reader = response.body?.getReader();
    return new ReadableStream({
      start(controller) {
        function push() {
          reader && reader.read().then(({done, value}) => {
            if (done) {
              if (payload.onEnd) {
                payload.onEnd();
              }
              controller.close();
              return;
            }
            controller.enqueue(value);
            payload.onData(new TextDecoder().decode(value));
            push();
          })
        }
        push();
      }
    });
  });
}