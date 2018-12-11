<template>
    <div class="dropdown-user-container">
        <Avatar style="background-color: #87d068" icon="ios-person" />
        <Dropdown trigger="click" style="margin-left: 8px">
            <a href="javascript:void(0)" style="font-size: 14px; color: #515a6e;">
                我是谁
                <Icon type="ios-arrow-down"></Icon>
            </a>
            <DropdownMenu slot="list">
                <DropdownItem>退出</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </div>
</template>
