package create_account

import (
	"testing"

	"github.com.br/devfullcycle/fc-ms-wallet/internal/entity"
	"github.com.br/devfullcycle/fc-ms-wallet/internal/usecase/mocks"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

type ClientGatewayMock struct {
	mock.Mock
}

func (m *ClientGatewayMock) Get(id string) (*entity.Client, error) {
	args := m.Called(id)
	return args.Get(0).(*entity.Client), args.Error(1)
}

func (m *ClientGatewayMock) Save(client *entity.Client) error {
	args := m.Called(client)
	return args.Error(0)
}

func TestCreateAccountUsecase_Execute(t *testing.T) {
	client, _ := entity.NewClient("Alef Passos", "a@a.com")
	clientMock := &ClientGatewayMock{}
	clientMock.On("Get", client.ID).Return(client, nil)

	accountMock := &mocks.AccountGatewayMock{}
	accountMock.On("Save", mock.Anything).Return(nil)

	uc := NewCreateAccountUsecase(accountMock, clientMock)
	inputDto := CreateAccountInputDTO{
		ClientID: client.ID,
	}

	output, err := uc.Execute(inputDto)
	assert.Nil(t, err)
	assert.NotNil(t, output)
	clientMock.AssertExpectations(t)
	accountMock.AssertExpectations(t)
	clientMock.AssertNumberOfCalls(t, "Get", 1)
	accountMock.AssertNumberOfCalls(t, "Save", 1)
}
