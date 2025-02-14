// Copyright 2022 The Perses Authors
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

package get

import (
	"testing"

	cmdUtils "github.com/perses/perses/internal/cli/utils"
	cmdUtilsTest "github.com/perses/perses/internal/cli/utils/test"
	"github.com/perses/perses/pkg/client/fake_api"
	"github.com/perses/perses/pkg/client/fake_api/fake_v1"
)

func TestGetCMD(t *testing.T) {
	testSuite := []cmdUtilsTest.Suite{
		{
			Title:           "empty args",
			Args:            []string{},
			IsErrorExpected: true,
			ExpectedMessage: cmdUtils.FormatAvailableResourcesMessage(),
		},
		{
			Title:           "kind not managed",
			Args:            []string{"whatever"},
			IsErrorExpected: true,
			ExpectedMessage: "resource \"whatever\" not managed",
		},
		{
			Title:           "not connected to anyAPI",
			Args:            []string{"project", "-ojson"},
			IsErrorExpected: true,
			ExpectedMessage: "you are not connected to any API",
		},
		{
			Title:           "get project in json format",
			Args:            []string{"project", "-ojson"},
			APIClient:       fake_api.New(),
			IsErrorExpected: false,
			ExpectedMessage: string(cmdUtilsTest.JSONMarshalStrict(fake_v1.ProjectList(""))) + "\n",
		},
		{
			Title:           "get project with prefix in json format",
			Args:            []string{"project", "per", "-ojson"},
			APIClient:       fake_api.New(),
			IsErrorExpected: false,
			ExpectedMessage: string(cmdUtilsTest.JSONMarshalStrict(fake_v1.ProjectList("per"))) + "\n",
		},
		{
			Title:           "get globaldatasource in json format",
			Args:            []string{"gdts", "-ojson"},
			APIClient:       fake_api.New(),
			IsErrorExpected: false,
			ExpectedMessage: string(cmdUtilsTest.JSONMarshalStrict(fake_v1.GlobalDatasourceList(""))) + "\n",
		},
		{
			Title:           "get all folder in json format",
			Args:            []string{"folder", "-ojson", "--all"},
			APIClient:       fake_api.New(),
			IsErrorExpected: false,
			ExpectedMessage: string(cmdUtilsTest.JSONMarshalStrict(fake_v1.FolderList("", ""))) + "\n",
		},
		{
			Title:           "get folder in a specific project in json format",
			Args:            []string{"folder", "-ojson", "-p", "perses"},
			APIClient:       fake_api.New(),
			IsErrorExpected: false,
			ExpectedMessage: string(cmdUtilsTest.JSONMarshalStrict(fake_v1.FolderList("perses", ""))) + "\n",
		},
		{
			Title:           "get folder with default project in json format",
			Args:            []string{"folder", "-ojson"},
			Project:         "perses",
			APIClient:       fake_api.New(),
			IsErrorExpected: false,
			ExpectedMessage: string(cmdUtilsTest.JSONMarshalStrict(fake_v1.FolderList("perses", ""))) + "\n",
		},
	}

	cmdUtilsTest.ExecuteSuiteTest(t, NewCMD, testSuite)
}
