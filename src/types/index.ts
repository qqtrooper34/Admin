export interface AuthServer {
  id: string;
  name: string;
  mini_backend_ip: string;
  mini_backend_port: number;
  api_call_url: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Agent {
  pk: string;
  name: string;
  code: string;
  phone: string;
  time_start: string;
  time_end: string;
  start_stock_name?: string;
  start_stock_addr?: string;
  start_x_stock?: number;
  start_y_stock?: number;
  end_stock_name?: string;
  end_stock_addr?: string;
  end_x_stock?: number;
  end_y_stock?: number;
  login: string;
  psw: string;
  is_active: boolean;
  weight_max: number;
  volume_max: number;
  ts_gid?: string;
  last_packet_time?: string;
  lastedittime?: string;
  createtime?: string;
  config_gid?: string;
  distance_limit?: number;
  overtime?: number;
  fixed_cost?: number;
  cost_per_km?: number;
  skills?: string[];
  zones?: string[];
  groups?: string[];
}

export interface Route {
  pk: string;
  name: string;
  code: string;
  begin_time: string;
  end_time: string;
  plan_route_length: number;
  fact_route_length?: number;
  lastedittime?: string;
  createtime?: string;
  point_start_time?: string;
  point_start_lon_x?: number;
  point_start_lat_y?: number;
  point_end_time?: string;
  point_end_lon_x?: number;
  point_end_lat_y?: number;
  pk_agent?: string;
  duration?: number;
  geometry?: string;
  color?: string;
  cost?: number;
  driver?: string;
  route_weight?: number;
  route_volume?: number;
  route_stops?: number;
}

export interface Configuration {
  guid: string;
  name: string;
  company_guid: string;
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
  freqget?: number;
  risk_late?: boolean;
  version?: number;
  allow_undo?: boolean;
  enable_logs?: boolean;
}