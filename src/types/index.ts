export interface AuthServer {
  id: string;
  name: string;
  mini_backend_ip: string;
  mini_backend_port: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Configuration {
  guid: string;
  company_guid: string;
  name: string;
  dispatcher_phone?: string;
  one_work_task?: boolean;
  ext_barcode_scanner?: boolean;
  task_redoing?: boolean;
  pay_system?: number;
  disable_reordering?: boolean;
  map_type?: number;
  map_key?: string;
  navi_type?: number;
  navi_key?: string;
  autopilot_enable?: boolean;
  autopilot_radius?: number;
  autopilot_time?: number;
  freqsend?: number;
  freqgps?: number;
  risk_late?: boolean;
  version?: number;
  allow_undo?: boolean;
  freqget?: number;
}

export interface Template {
  guid: string;
  company_guid: string;
  name: string;
  task_buttons?: Record<string, any>;
  task_buttons_extra?: Record<string, any>;
  data?: Record<string, any>;
}

export interface Import {
  guid: string;
  company_guid: string;
  name: string;
  comment?: string;
  config?: Record<string, any>;
  data?: Record<string, any>;
  task_buttons?: Record<string, any>;
  task_buttons_extra?: Record<string, any>;
}