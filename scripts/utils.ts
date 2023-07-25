// Copyright 2023 J.W. Lagendijk. All rights reserved. MIT license.

export const updateText = (
  blockID: string,
  text: string,
  update: string,
): string => {
  const startSnippetPos = text.indexOf(`<!-- START ${blockID} -->`);
  const endSnippetPos = text.indexOf(`<!-- END ${blockID} -->`);

  const startSnippet = text.slice(0, startSnippetPos + 23);
  const endSnippet = text.slice(endSnippetPos);

  const updatedText = `${startSnippet}\n${update}\n${endSnippet}`;

  return updatedText;
};
