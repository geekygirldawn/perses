// Copyright 2021 The Perses Authors
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { LayoutDefinition } from './layout';
import { PanelDefinition } from './panels';
import { ProjectMetadata } from './resource';
import { DurationString } from './time';
import { VariableDefinition } from './variables';

export interface DatasourceSelector {
  name: string;
  kind: string;
  global: boolean;
}

export interface DashboardResource {
  kind: 'Dashboard';
  metadata: ProjectMetadata;
  spec: DashboardSpec;
}

export interface DashboardSpec {
  datasource: DatasourceSelector;
  duration: DurationString;
  variables: Record<string, VariableDefinition>;
  layouts: LayoutDefinition[];
  panels: Record<string, PanelDefinition>;
}
