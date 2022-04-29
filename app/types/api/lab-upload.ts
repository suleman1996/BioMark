import { ApiResponse } from './api-response';

export interface LabUploadRequest {
  lab_upload: {
    name: string;
    attachments: Pick<Attachment, 'filename' | 'base64' | 'filetype'>[];
  };
}

export interface Attachment {
  id: number;
  filename: string;
  base64: string;
  base64raw: string;
  filetype: 'jpg' | 'png' | 'pdf';
}

// TODO define types once we know them
export interface LabUploadPayload {
  id: number;
  name: string;
  document_type_id: any;
  document_other_type: any;
  document_source_id: any;
  document_other_source: any;
  status: number;
  document_tag_id: number;
  document_review_id: number;
  app_tag_id: number;
  document_source_name: string;
  document_type_name: string;
  document_date: string;
  document_attachments: DocumentAttachment[];
  document_tag_name: string;
  app_tag_name: string;
  document_status_name: string;
  document_review_name: string;
  document_caption: string;
}

export interface DocumentAttachment {
  id: number;
  document: { url: string };
  filetype: 'jpg' | 'png';
}

export type LabUploadResponse = ApiResponse<LabUploadPayload>;
