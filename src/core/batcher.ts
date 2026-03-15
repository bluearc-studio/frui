type NuiMessage = {
  action: string;
  [key: string]: any;
};

let queue: NuiMessage[] = [];
let scheduled = false;

export function enqueueMessage(message: NuiMessage) {
  queue.push(message);

  if (!scheduled) {
    scheduled = true;

    requestAnimationFrame(processQueue);
  }
}

let processor: ((msg: NuiMessage) => void) | null = null;

export function setBatchProcessor(fn: (msg: NuiMessage) => void) {
  processor = fn;
}

function processQueue() {
  const batch = queue;
  queue = [];
  scheduled = false;

  if (!processor) return;

  for (const msg of batch) {
    processor(msg);
  }
}
