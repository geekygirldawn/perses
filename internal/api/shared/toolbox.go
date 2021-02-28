// Copyright 2021 Amadeus s.a.s
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

package shared

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

type ToolboxService interface {
	Create(entity interface{}) (interface{}, error)
}

// Toolbox is an interface that defines the different methods that can be used in the different endpoint of the API.
// This is a way to align the code of the different endpoint.
type Toolbox interface {
	Create(ctx echo.Context, entity interface{}) error
}

func NewToolBox(service ToolboxService) Toolbox {
	return &toolboxImpl{
		service: service,
	}
}

type toolboxImpl struct {
	Toolbox
	service ToolboxService
}

func (t *toolboxImpl) Create(ctx echo.Context, entity interface{}) error {
	if err := ctx.Bind(entity); err != nil {
		return err
	}
	newEntity, err := t.service.Create(entity)
	if err != nil {
		return handleError(err)
	}
	return ctx.JSON(http.StatusOK, newEntity)
}
