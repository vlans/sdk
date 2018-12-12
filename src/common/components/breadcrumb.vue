<template>
    <Breadcrumb :style="{ margin: '16px 0' }">
        <BreadcrumbItem
            v-if="$route.meta && $route.meta.breadcrum"
            v-for="(item, index) in $route.meta.breadcrum"
            :to="item.url"
            :key="index">{{ item.name }}</BreadcrumbItem>
        <i v-if="false"></i>
    </Breadcrumb>
</template>
