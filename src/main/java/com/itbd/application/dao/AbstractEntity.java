package com.itbd.application.dao;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.PrePersist;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.SourceType;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.proxy.HibernateProxy;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@MappedSuperclass
@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
public class AbstractEntity<U> {

    @Column(name = "dtt_added", nullable = false, updatable = false, columnDefinition = "datetime")
    @ColumnDefault("'19000101'")
    @CreationTimestamp(source = SourceType.DB)
    public LocalDateTime createdAt;

    @Column(name = "dtt_mod", nullable = false, columnDefinition = "datetime")
    @ColumnDefault("'19000101'")
    @UpdateTimestamp(source = SourceType.DB)
    public LocalDateTime updatedAt;

    @Column(name = "id_user_gen", nullable = false)
    @ColumnDefault("-2147483648")
    @CreatedBy
    @JsonIgnore
    public U createdBy;

    @Column(name = "id_user_mod", nullable = false)
    @ColumnDefault("-2147483648")
    @LastModifiedBy
    @JsonIgnore
    public U modifiedBy;

//    @Column(name = "id_user_gen", nullable = false)
//    @ColumnDefault("-2147483648")
//    @CreatedBy
//    public Long createdBy;
//
//    @Column(name = "id_user_mod", nullable = false)
//    @ColumnDefault("-2147483648")
//    @LastModifiedBy
//    public Long modifiedBy;

    @Column(name = "is_active", nullable = false, insertable = false)
    @ColumnDefault("1")
    public Boolean recordActive;

    @Column(name = "id_env_key", nullable = false)
    @ColumnDefault("-2147483648")
    public Long environmentKey;

    @Column(name = "id_event_key", nullable = false)
    @ColumnDefault("-2147483648")
    public Long eventKey;

    @Column(name = "id_state_key", nullable = false)
    @ColumnDefault("-2147483648")
    public Long stateKey;

    @Column(name = "id_action_key", nullable = false)
    @ColumnDefault("-2147483648")
    public Long actionKey;

    @Column(name = "tx_comment", nullable = false, length = 150)
    @ColumnDefault("'?'")
    public String recordComment;

    @PrePersist
    private void initialValue() {
        environmentKey = environmentKey != null ? environmentKey : -2147483648;
        eventKey = eventKey != null ? eventKey : -2147483648;
        stateKey = stateKey != null ? stateKey : -2147483648;
        actionKey = actionKey != null ? actionKey : -2147483648;
        recordComment = recordComment != null ? recordComment : "?";
    }

    @Override
    public final int hashCode() {
        return this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass().hashCode() : getClass().hashCode();
    }
}
