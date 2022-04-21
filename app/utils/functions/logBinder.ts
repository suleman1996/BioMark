const logger = console.log.bind(console, `[BioMark] `);

export const logNow = async (comment?: any, body: any = '') => {
  logger(comment, body);
};
